import { supabase } from "./supabase";

export const taskService = {
  async getAllTasks() {
    const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createTask(taskData) {
    const { data, error } = await supabase.from("tasks").insert([taskData]).select();

    if (error) throw error;
    return data[0];
  },

  async updateTask(id, taskData) {
    const { data, error } = await supabase.from("tasks").update(taskData).eq("id", id).select();

    if (error) throw error;
    return data[0];
  },

  async deleteTask(id) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) throw error;
    return true;
  },

  async getTaskById(id) {
    const { data, error } = await supabase.from("tasks").select("*").eq("id", id).single();

    if (error) throw error;
    return data;
  },
};
