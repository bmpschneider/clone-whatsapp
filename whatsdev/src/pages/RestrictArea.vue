

<template>
  <q-page class="container full-height">
    <div>
      <ConversationArea :users="users" @selectedItem="setCurrentItem" />
    </div>
    <div class="column" v-if="selectedItem">
      <TopBar :title="nameConversation" />
      <ChatArea :currentUser="selectedItem" :newMessages="newMessages" />
      <MessageBar :currentUser="selectedItem" @reload="reloadMessages" />
    </div>
    <Empty v-else />
  </q-page>
</template>

<script>
import Empty from "../components/Empty/Index";
import ConversationArea from "../components/ConversationArea/Index";
import TopBar from "../components/TopBar/index";
import ChatArea from "../components/ChatArea/index";
import MessageBar from "src/components/MessageBar/index";
import { socket } from "src/services/socket";
import { notify } from "src/utils";
import api from "src/services/api";

export default {
  name: "MainLayout",
  data() {
    return {
      users: [],
      newMessages: "",
      selectedItem: null,
      nameConversation: "",
    };
  },
  components: {
    Empty,
    ConversationArea,
    TopBar,
    ChatArea,
    MessageBar,
  },

  created() {
    const receiver = localStorage.getItem("receiver");
    socket.on(receiver, (message) => {
      const arr = [];
      this.users.forEach((item) => {
        if (item.id === message.user_id) {
          item.newMessage = true;
        }
        arr.push(item);
      });
      this.newMessages = message.id;
      this.users = arr;
    });
  },
  async mounted() {
    await api
      .get("users")
      .then((response) => {
        this.users = response.data;
      })
      .catch(() => {
        notify("negative", "Falha ao lista usuários");
      });
  },
  methods: {
    async setCurrentItem({ id, email }) {
      this.selectedItem = id;

      await api
        .get(`user/${email}`)
        .then((response) => {
          this.nameConversation = response.data.name;
        })
        .catch(() => {
          this.nameConversation = "Novo Usuario";
        });
    },
    reloadMessages({ messageId }) {
      this.newMessages = messageId;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  overflow: hidden;
  min-width: 1200px;
}
</style>
