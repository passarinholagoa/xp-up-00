export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      dailies: {
        Row: {
          coin_reward: number
          completed: boolean
          completed_at: string | null
          created_at: string
          difficulty: string
          due_time: string
          id: string
          streak: number
          title: string
          updated_at: string
          user_id: string
          xp_reward: number
        }
        Insert: {
          coin_reward?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          difficulty: string
          due_time?: string
          id?: string
          streak?: number
          title: string
          updated_at?: string
          user_id: string
          xp_reward?: number
        }
        Update: {
          coin_reward?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          difficulty?: string
          due_time?: string
          id?: string
          streak?: number
          title?: string
          updated_at?: string
          user_id?: string
          xp_reward?: number
        }
        Relationships: []
      }
      game_states: {
        Row: {
          coins: number
          created_at: string
          hp: number
          id: string
          level: number
          max_hp: number
          max_xp: number
          streak: number
          total_xp: number
          updated_at: string
          xp: number
        }
        Insert: {
          coins?: number
          created_at?: string
          hp?: number
          id: string
          level?: number
          max_hp?: number
          max_xp?: number
          streak?: number
          total_xp?: number
          updated_at?: string
          xp?: number
        }
        Update: {
          coins?: number
          created_at?: string
          hp?: number
          id?: string
          level?: number
          max_hp?: number
          max_xp?: number
          streak?: number
          total_xp?: number
          updated_at?: string
          xp?: number
        }
        Relationships: []
      }
      habits: {
        Row: {
          coin_reward: number
          created_at: string
          difficulty: string
          id: string
          is_positive: boolean
          streak: number
          title: string
          updated_at: string
          user_id: string
          xp_reward: number
        }
        Insert: {
          coin_reward?: number
          created_at?: string
          difficulty: string
          id?: string
          is_positive?: boolean
          streak?: number
          title: string
          updated_at?: string
          user_id: string
          xp_reward?: number
        }
        Update: {
          coin_reward?: number
          created_at?: string
          difficulty?: string
          id?: string
          is_positive?: boolean
          streak?: number
          title?: string
          updated_at?: string
          user_id?: string
          xp_reward?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar: string
          background_color: string
          created_at: string
          display_name: string
          frame_border: string
          id: string
          name_color: string
          updated_at: string
        }
        Insert: {
          avatar?: string
          background_color?: string
          created_at?: string
          display_name?: string
          frame_border?: string
          id: string
          name_color?: string
          updated_at?: string
        }
        Update: {
          avatar?: string
          background_color?: string
          created_at?: string
          display_name?: string
          frame_border?: string
          id?: string
          name_color?: string
          updated_at?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          animated_xp_bar: boolean
          created_at: string
          daily_reminder: boolean
          global_notifications: boolean
          hardcore_mode: boolean
          id: string
          reminder_time: string
          updated_at: string
          vacation_mode: boolean
        }
        Insert: {
          animated_xp_bar?: boolean
          created_at?: string
          daily_reminder?: boolean
          global_notifications?: boolean
          hardcore_mode?: boolean
          id: string
          reminder_time?: string
          updated_at?: string
          vacation_mode?: boolean
        }
        Update: {
          animated_xp_bar?: boolean
          created_at?: string
          daily_reminder?: boolean
          global_notifications?: boolean
          hardcore_mode?: boolean
          id?: string
          reminder_time?: string
          updated_at?: string
          vacation_mode?: boolean
        }
        Relationships: []
      }
      todos: {
        Row: {
          coin_reward: number
          completed: boolean
          completed_at: string | null
          created_at: string
          difficulty: string
          due_date: string
          id: string
          is_overdue: boolean
          priority: string
          title: string
          updated_at: string
          user_id: string
          xp_reward: number
        }
        Insert: {
          coin_reward?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          difficulty: string
          due_date: string
          id?: string
          is_overdue?: boolean
          priority: string
          title: string
          updated_at?: string
          user_id: string
          xp_reward?: number
        }
        Update: {
          coin_reward?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          difficulty?: string
          due_date?: string
          id?: string
          is_overdue?: boolean
          priority?: string
          title?: string
          updated_at?: string
          user_id?: string
          xp_reward?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_daily_rewards: {
        Args: { difficulty_level: string }
        Returns: {
          xp_reward: number
          coin_reward: number
        }[]
      }
      calculate_habit_rewards: {
        Args: { difficulty_level: string }
        Returns: {
          xp_reward: number
          coin_reward: number
        }[]
      }
      calculate_todo_rewards: {
        Args: { difficulty_level: string; priority_level: string }
        Returns: {
          xp_reward: number
          coin_reward: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
