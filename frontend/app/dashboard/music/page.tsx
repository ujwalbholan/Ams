"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Edit } from "lucide-react";
import Link from "next/link";
import { musicService } from "@/services/music.service";

interface Music {
  id: number;
  title: string;
  album_name: string;
  genre: string;
  artist_id: number;
}

export default function MusicPage() {
  const [musicList, setMusicList] = useState<Music[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMusic = async () => {
    try {
      setLoading(true);
      const data = await musicService.getAllMusic();
      setMusicList(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch music");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this music?")) return;

    try {
      await musicService.deleteMusic(id);
      setMusicList((prev) => prev.filter((m) => m.id !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to delete music");
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  const filteredMusic = musicList.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.album_name.toLowerCase().includes(search.toLowerCase()) ||
      m.genre.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p>Loading music...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Music Management</h1>
        <Link href="/dashboard/music/create">
          <Button>Add Music</Button>
        </Link>
      </div>

      <div className="w-1/2">
        <Input
          placeholder="Search by title, album, genre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Album</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Artist ID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMusic.map((music) => (
            <TableRow key={music.id}>
              <TableCell>{music.title}</TableCell>
              <TableCell>{music.album_name}</TableCell>
              <TableCell>{music.genre}</TableCell>
              <TableCell>{music.artist_id}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={`/dashboard/music/${music.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit size={16} />
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(music.id)}
                >
                  <Trash size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
