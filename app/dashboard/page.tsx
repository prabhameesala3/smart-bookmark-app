"use client";

import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  // 🔹 Get logged in user
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/");
      } else {
        setUser(data.session.user);
      }
    };

    getSession();
  }, []);

  // 🔹 Fetch bookmarks
  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setBookmarks(data || []);
    }
  };

  // 🔹 Fetch when user loads
  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user]);

  // 🔹 Realtime updates
  useEffect(() => {
    const channel = supabase
      .channel("bookmarks-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 🔹 Add bookmark
  const addBookmark = async () => {
    if (!url || !user) return;

    await supabase.from("bookmarks").insert({
      url,
      user_id: user.id,
    });

    setUrl("");
  };

  // 🔹 Delete bookmark
  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  // 🔹 Logout
  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!user) return <h1 style={{ padding: "40px" }}>Loading...</h1>;

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2>Welcome {user.email}</h2>

      {/* Add Bookmark */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addBookmark}>Add</button>
      </div>

      {/* Bookmark List */}
      <ul style={{ marginTop: "30px" }}>
        {bookmarks.length === 0 && <p>No bookmarks yet.</p>}

        {bookmarks.map((bookmark) => (
          <li key={bookmark.id} style={{ marginBottom: "10px" }}>
            <a
              href={bookmark.url}
              target="_blank"
              style={{ marginRight: "10px" }}
            >
              {bookmark.url}
            </a>

            <button onClick={() => deleteBookmark(bookmark.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <button
        onClick={logout}
        style={{ marginTop: "30px", backgroundColor: "red", color: "white" }}
      >
        Logout
      </button>
    </div>
  );
}
