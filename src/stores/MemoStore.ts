import { defineStore } from "pinia";
import { uuid } from "vue-uuid";
import { AddingData, Memo } from "../types";
import { UpdatingData } from "../types";

export const useMemoStore = defineStore("Memo", {
  state: () => ({
    memos: [] as Memo[] | null,
    now: new Date()
  }),
  getters: {
    createdAt(): string {
      return this.now.getMonth() + 1 + "/" + this.now.getDate();
    },
    updatedAt(): string {
      return this.now.getMonth() + 1 + "/" + this.now.getDate();
    }
  },
  actions: {
    addFn(data: AddingData) {
      this.memos?.push({
        id: uuid.v1(),
        title: data.title,
        content: data.content,
        category: data.category,
        link: data.link,
        createdAt: this.createdAt,
        updatedAt: "",
        isDone: false,
      });
    },
    deleteFn() {
      const newMemos = this.memos?.filter((memo) => memo.isDone !== true);

      // validation
      if (newMemos?.length === this.memos?.length) {
        alert("Oops! No memos has been selected");
        return;
      }

      const res = window.confirm("Is it ok?");
      if (res) {
        this.memos = newMemos!;
      }
    },
    updateFn({ id, title, content, category, link }: UpdatingData) {
      const targetMemo = this.memos!.filter((memo) => memo.id === id)[0];
      targetMemo!.title = title;
      targetMemo!.content = content;
      targetMemo!.category = category;
      targetMemo!.link = link;
      targetMemo!.updatedAt = this.updatedAt;
    },
    handleFn(targetId: string) {
      const targetMemo = this.memos?.filter((memo) => memo.id === targetId)[0];
      targetMemo!.isDone = !targetMemo!.isDone;
    }
  }
});

