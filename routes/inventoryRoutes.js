import express from "express";
import Inventory from "./models/inventory.js";

const router = express.Router();

// GET all items
router.get("/", async (req, res) => {
  const items = await Inventory.find();
  res.json(items);
});

// ADD new item
router.post("/", async (req, res) => {
  try {
    const item = new Inventory(req.body);
    const saved = await item.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE item
router.put("/:id", async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// BULK SYNC (Flutter SQLite → MongoDB)
router.post("/sync", async (req, res) => {
  try {
    const list = req.body.items;
    if (!Array.isArray(list)) {
      return res.status(400).json({ error: "items must be array" });
    }

    // Clear Mongo and Replace with Flutter's SQLite Data
    await Inventory.deleteMany({});
    const inserted = await Inventory.insertMany(list);

    res.json({ synced: inserted.length });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;