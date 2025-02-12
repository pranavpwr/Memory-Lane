import { useEffect, useState } from "react";
import { getMemories } from "../api";

const Memories = () => {
    const [memories, setMemories] = useState([]);

    useEffect(() => {
        fetchMemories();
    }, []);

    const fetchMemories = async () => {
        try {
            const { data } = await getMemories();
            setMemories(data);
        } catch (error) {
            alert("Failed to fetch memories");
        }
    };

    return (
        <div>
            <h2>Memories</h2>
            {memories.map((mem) => (
                <div key={mem._id}>
                    <h3>{mem.title}</h3>
                    <p>{mem.description}</p>
                    {mem.media && (
                        mem.media.endsWith(".mp4") ? (
                            <video src={`http://localhost:5000${mem.media}`} width="200" controls />
                        ) : (
                            <img src={`http://localhost:5000${mem.media}`} alt="Memory" width="200" />
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export default Memories;
