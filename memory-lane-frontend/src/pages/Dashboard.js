import AddMemory from "../components/AddMemory";
import Memories from "../components/Memories";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <AddMemory onMemoryAdded={() => window.location.reload()} />
            <Memories />
        </div>
    );
};

export default Dashboard;
