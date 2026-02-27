/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import { musicService } from "@/services/music.service";
import { useToast } from "@/components/ui/toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CreateMusicModal() {

  const [open, setOpen] = useState(false);

  const [artists] = useState([
    { id: 1, name: "Drake" },
    { id: 2, name: "Taylor Swift" },
    { id: 3, name: "The Weeknd" },
  ]);

  const [form, setForm] = useState({
    artist_id: "",
    title: "",
    album_name: "",
    genre: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.artist_id) {
      // useToast({
      //   message: "Please select an artist",
      //   type: "error",
      //   title: ""
      // });
      // return;
    }

    setLoading(true);
    try {
      await musicService.createMusic({
        artist_id: Number(form.artist_id),
        title: form.title,
        album_name: form.album_name,
        genre: form.genre,
      });

      useToast({
        message: `${form.title} has been added successfully!`,
        type: "success",
        title: ""
      });

      setForm({ artist_id: "", title: "", album_name: "", genre: "" });
      setOpen(false);
    } catch (err: any) {
      useToast({
        message: err.message || "Failed to create music",
        type: "error",
        title: ""
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Music</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Music</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="artist_id">Artist</Label>
            <Select
              value={form.artist_id}
              onValueChange={(val) => handleChange("artist_id", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Artist" />
              </SelectTrigger>
              <SelectContent>
                {artists.map((artist) => (
                  <SelectItem key={artist.id} value={artist.id.toString()}>
                    {artist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter Music Title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="album_name">Album Name</Label>
            <Input
              id="album_name"
              type="text"
              placeholder="Enter Album Name"
              value={form.album_name}
              onChange={(e) => handleChange("album_name", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="genre">Genre</Label>
            <Select
              value={form.genre}
              onValueChange={(val) => handleChange("genre", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rnb">R&B</SelectItem>
                <SelectItem value="country">Country</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="jazz">Jazz</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="mt-4 w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Music"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
