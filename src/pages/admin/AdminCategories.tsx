import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialCategories = [
  { id: "1", name: "Action", slug: "action", movieCount: 45 },
  { id: "2", name: "Drama", slug: "drama", movieCount: 62 },
  { id: "3", name: "Comedy", slug: "comedy", movieCount: 38 },
  { id: "4", name: "Romance", slug: "romance", movieCount: 29 },
  { id: "5", name: "Thriller", slug: "thriller", movieCount: 41 },
  { id: "6", name: "Horror", slug: "horror", movieCount: 15 },
  { id: "7", name: "Family", slug: "family", movieCount: 22 },
];

const AdminCategories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const slug = newCategory.toLowerCase().replace(/\s+/g, "-");
    const newCat = {
      id: Date.now().toString(),
      name: newCategory,
      slug,
      movieCount: 0,
    };

    setCategories([...categories, newCat]);
    setNewCategory("");
    toast({
      title: "Category Added",
      description: `"${newCategory}" has been added successfully.`,
    });
  };

  const handleEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditValue(name);
  };

  const handleSaveEdit = (id: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? { ...cat, name: editValue, slug: editValue.toLowerCase().replace(/\s+/g, "-") }
          : cat
      )
    );
    setEditingId(null);
    toast({
      title: "Category Updated",
      description: "Category has been updated successfully.",
    });
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast({
      title: "Category Deleted",
      description: "Category has been deleted successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Categories
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage movie categories and genres
          </p>
        </div>

        {/* Add New Category */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
            <CardDescription>
              Create a new category for organizing movies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="categoryName" className="sr-only">
                  Category Name
                </Label>
                <Input
                  id="categoryName"
                  placeholder="Enter category name..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                />
              </div>
              <Button onClick={handleAddCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories List */}
        <Card>
          <CardHeader>
            <CardTitle>All Categories</CardTitle>
            <CardDescription>
              {categories.length} categories total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Movies</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {editingId === category.id ? (
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleSaveEdit(category.id)
                          }
                          className="h-8 w-40"
                        />
                      ) : (
                        <span className="font-medium">{category.name}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {category.slug}
                    </TableCell>
                    <TableCell>{category.movieCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {editingId === category.id ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSaveEdit(category.id)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(category.id, category.name)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
