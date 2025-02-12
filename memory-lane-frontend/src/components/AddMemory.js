import { useState } from "react";
import { addMemory } from "../api";

const AddMemory = ({ onMemoryAdded }) => {
    const [memory, setMemory] = useState({ title: "", description: "", media: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMemory(memory);
            onMemoryAdded();
        } catch (error) {
            alert("Failed to add memory");
        }
    };

    return (
        <div>
            <h3>Add Memory</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" onChange={(e) => setMemory({ ...memory, title: e.target.value })} required />
                <textarea placeholder="Description" onChange={(e) => setMemory({ ...memory, description: e.target.value })} required />
                <input type="text" placeholder="Image/Video URL" onChange={(e) => setMemory({ ...memory, media: e.target.value })} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddMemory;
