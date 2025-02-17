// tangram.js

// Wait until the DOM content is fully loaded
window.addEventListener("load", function() {
  // Select all pieces within the puzzle container
  const pieces = document.querySelectorAll(".puzzle-container > div");

  // Add mousedown (to start drag) and dblclick (to rotate) event listeners to each piece
  pieces.forEach(function(piece) {
    // Initialize a data attribute to store the current rotation (optional for rotation)
    piece.dataset.rotation = 0;
    // Ensure the piece is absolutely positioned (it should already be set in CSS)
    piece.style.position = "absolute";
    // Attach event listeners for dragging and rotation
    piece.addEventListener("mousedown", startDrag);
    piece.addEventListener("dblclick", rotatePiece);
  });

  let selectedPiece = null;
  let offsetX = 0, offsetY = 0;

  // Called when the user presses the mouse button down on a piece
  function startDrag(e) {
    selectedPiece = this;
    // Bring the piece to the front
    selectedPiece.style.zIndex = 1000;
    // Calculate the offset from the piece's top-left corner to the mouse position
    const rect = selectedPiece.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    // Listen for mousemove events on the document to drag the piece
    document.addEventListener("mousemove", dragPiece);
    // Prevent default behavior (like text selection)
    e.preventDefault();
  }

  // Called on every mousemove event while dragging
  function dragPiece(e) {
    if (!selectedPiece) return;
    // Get the puzzle container's bounding rectangle to calculate the position relative to it
    const container = document.querySelector(".puzzle-container");
    const containerRect = container.getBoundingClientRect();
    // Compute the new left and top positions
    const newLeft = e.clientX - containerRect.left - offsetX;
    const newTop = e.clientY - containerRect.top - offsetY;
    // Update the piece's position
    selectedPiece.style.left = newLeft + "px";
    selectedPiece.style.top = newTop + "px";
  }

  // Called when the user releases the mouse button
  function endDrag(e) {
    // Remove the mousemove event listener since dragging is finished
    document.removeEventListener("mousemove", dragPiece);
    // Optionally, reset the z-index
    if (selectedPiece) {
      selectedPiece.style.zIndex = 1;
    }
    selectedPiece = null;
  }

  // Listen for mouseup events on the entire document
  document.addEventListener("mouseup", endDrag);

  // Optional: Rotate the piece by 15° on double-click
  function rotatePiece(e) {
    let currentRotation = parseInt(this.dataset.rotation, 10) || 0;
    currentRotation = (currentRotation + 15) % 360;
    this.dataset.rotation = currentRotation;
    this.style.transform = "rotate(" + currentRotation + "deg)";
  }
});
