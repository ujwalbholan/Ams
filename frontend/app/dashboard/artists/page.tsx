"use client";

import { useEffect, useState } from "react";
import { artistService, Artist, ArtistPayload } from "@/services/artist.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Trash2, Edit } from "lucide-react";
import AddArtistModal from "./(components)/AddArtistModal";

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const { showToast } = useToast();

  const fetchArtists = async () => {
    setLoading(true);
    try {
      const res = await artistService.getArtists(1, 10);
      setArtists(res.data);
    } catch (err: any) {
      showToast({
        message: err.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this artist?");
    if (!confirmed) return;

    try {
      await artistService.deleteArtist(id);
      setArtists((prev) => prev.filter((a) => a.id !== id));
      showToast({
        message: "Artist has been removed successfully",
        type: "success",
      });
    } catch (err: any) {
      showToast({
        message: err.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const handleEdit = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const handleUpdate = (id: number, data: Partial<ArtistPayload>) => {
    setArtists((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...data } : a)),
    );
  };

  useEffect(() => {
    if (!isModalOpen) fetchArtists();
  }, [isModalOpen]);

  return (
    <div className="p-4 md:p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Artists</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Artist</Button>
      </div>

      {/* <AddArtistModal open={isModalOpen} onOpenChange={setIsModalOpen} /> */}
      <AddArtistModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedArtist(null);
        }}
        artistToEdit={selectedArtist}
        onUpdate={handleUpdate}
      />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>First Release Year</TableHead>
              <TableHead>Albums Released</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artists.map((artist) => (
              <TableRow key={artist.id}>
                <TableCell>{artist.name}</TableCell>
                <TableCell>{artist.dob}</TableCell>
                <TableCell>{artist.gender.toUpperCase()}</TableCell>
                <TableCell>{artist.address}</TableCell>
                <TableCell>{artist.first_release_year}</TableCell>
                <TableCell>{artist.no_of_albums_released}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(artist)}
                    className="mr-2"
                  >
                    <Edit size={20} />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(artist.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {loading && <p className="mt-4 text-gray-500">Loading artists...</p>}
    </div>
  );
}
