// Initialize these to null to make sure they are in the global scope
let MoodContract = null;
let signer = null;

// Async function to initialize the contract and signer
async function initialize() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
    await provider.send("eth_requestAccounts", []);
    const accounts = await provider.listAccounts();
    signer = provider.getSigner(accounts[0]);
    const MoodContractAddress = "0x2953FF3579138E0C40312455070af0FB83719Ed4";
    const MoodContractABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_mood",
                    "type": "string"
                }
            ],
            "name": "setMood",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getMood",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    MoodContract = new ethers.Contract(MoodContractAddress, MoodContractABI, signer);
}

// Call initialize when the window loads
window.onload = initialize;

async function getMood() {
    try {
        const mood = await MoodContract.getMood();
        document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function setMood() {
    try {
        const mood = document.getElementById("mood").value;
        await MoodContract.setMood(mood);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}