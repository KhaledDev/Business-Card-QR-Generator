const upload_img = async (file) => {
    // Check if the file object is provided
    if (!file) {
        alert('Please select a file first.');
        return;
    }
    
    console.log("Chose a file");
    
    // Ensure the filename is derived correctly from the URI
    const fileName = file.uri ? file.uri.split('/').pop() : "unknown.jpg"; // Corrected typo here
    console.log("chose a filename: " + fileName);
    const fileUri = file.uri;
    console.log("Chose a file URI: " + fileUri);
    const fileType = file.type;
    console.log("Chose a file type: " + fileType);
    
    // Create FormData to send to the backend
    const formData = new FormData();
    formData.append("file", {
        uri: fileUri,
        name: fileName,
        type: fileType, // Make sure this is the correct type based on the image selected
    });
    
    try {
        // Send the POST request to the Flask server
        const response = await fetch('http://127.0.0.1:5000/KhaledDev/upload_img', {
            method: 'POST',
            body: formData, // Do not set Content-Type, let fetch handle it
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Get the response text from the server
        const result = await response.text();
        alert(result); // Show the server response

    } catch (error) {
        alert("Error uploading the file: " + error.message); // Improved error alert message
        console.log("Upload error:", error); // Console log for debugging
    }
};

export { upload_img };
