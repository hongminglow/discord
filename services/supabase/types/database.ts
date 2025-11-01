export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      chat_room: {
        Row: {
          created_at: string;
          id: string;
          is_public: boolean;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_public: boolean;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_public?: boolean;
          name?: string;
        };
        Relationships: [];
      };
      chat_room_member: {
        Row: {
          chat_room_id: string;
          created_at: string;
          member_id: string;
        };
        Insert: {
          chat_room_id: string;
          created_at?: string;
          member_id: string;
        };
        Update: {
          chat_room_id?: string;
          created_at?: string;
          member_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_room_member_chat_room_id_fkey";
            columns: ["chat_room_id"];
            isOneToOne: false;
            referencedRelation: "chat_room";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_room_member_member_id_fkey";
            columns: ["member_id"];
            isOneToOne: false;
            referencedRelation: "user_profile";
            referencedColumns: ["id"];
          }
        ];
      };
      message: {
        Row: {
          author_id: string | null;
          chat_room_id: string | null;
          created_at: string;
          id: string;
          text: string;
        };
        Insert: {
          author_id?: string | null;
          chat_room_id?: string | null;
          created_at?: string;
          id?: string;
          text: string;
        };
        Update: {
          author_id?: string | null;
          chat_room_id?: string | null;
          created_at?: string;
          id?: string;
          text?: string;
        };
        Relationships: [
          {
            foreignKeyName: "message_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "user_profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "message_chat_room_id_fkey";
            columns: ["chat_room_id"];
            isOneToOne: false;
            referencedRelation: "chat_room";
            referencedColumns: ["id"];
          }
        ];
      };
      user_profile: {
        Row: {
          created_at: string;
          id: string;
          image_url: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_url: string;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_url?: string;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      add_user_to_room: {
        Args: { room_id: string; user_id: string };
        Returns: boolean;
      };
      create_chat_room_with_owner: {
        Args: { p_is_public?: boolean; p_name: string; p_owner_id: string };
        Returns: {
          created_at: string;
          id: string;
          is_public: boolean;
          name: string;
        };
        SetofOptions: {
          from: "*";
          to: "chat_room";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      get_chat_room_messages: {
        Args: { page_offset?: number; page_size?: number; room_id: string };
        Returns: {
          author_id: string;
          author_image_url: string;
          author_name: string;
          created_at: string;
          id: string;
          text: string;
        }[];
      };
      get_public_chat_rooms: {
        Args: never;
        Returns: {
          created_at: string;
          id: string;
          member_count: number;
          name: string;
        }[];
      };
      get_room_members: {
        Args: { room_id: string };
        Returns: {
          image_url: string;
          joined_at: string;
          member_id: string;
          name: string;
        }[];
      };
      get_room_message_count: { Args: { room_id: string }; Returns: number };
      get_user_chat_rooms: {
        Args: { user_id: string };
        Returns: {
          created_at: string;
          id: string;
          is_public: boolean;
          last_message_at: string;
          member_count: number;
          name: string;
        }[];
      };
      get_user_message_stats: {
        Args: { user_id: string };
        Returns: {
          first_message_at: string;
          last_message_at: string;
          messages_in_most_active_room: number;
          most_active_room_id: string;
          most_active_room_name: string;
          rooms_participated: number;
          total_messages: number;
        }[];
      };
      invite_room_member: {
        Args: { p_actor_id: string; p_member_id: string; p_room_id: string };
        Returns: boolean;
      };
      is_user_room_member: {
        Args: { room_id: string; user_id: string };
        Returns: boolean;
      };
      remove_user_from_room: {
        Args: { room_id: string; user_id: string };
        Returns: boolean;
      };
      search_messages: {
        Args: { limit_count?: number; search_query: string; user_id: string };
        Returns: {
          author_id: string;
          author_name: string;
          created_at: string;
          message_id: string;
          room_id: string;
          room_name: string;
          text: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
