export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_id: string
          created_at: string
          id: string
          unlocked: boolean
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          created_at?: string
          id?: string
          unlocked?: boolean
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          created_at?: string
          id?: string
          unlocked?: boolean
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
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
          due_time: string
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
      shop_items: {
        Row: {
          created_at: string
          id: string
          item_id: string
          owned: boolean
          purchased_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          owned?: boolean
          purchased_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          owned?: boolean
          purchased_at?: string | null
          user_id?: string
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
      calculate_habit_rewards: {
        Args: { difficulty_level: string }
        Returns: {
          xp_reward: number
          coin_reward: number
        }[]
      }
      reset_dailies: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_overdue_todos: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
