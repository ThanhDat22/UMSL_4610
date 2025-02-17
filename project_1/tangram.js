// tangram.js

// Wait until the DOM content is fully loaded
window.addEventListener("load", function() {
    // Select all pieces inside the left puzzle container
    const pieces = document.querySelectorAll("#leftPuzzle > div");
  
    // Initialize each piece's rotation and attach event listeners
    pieces.forEach(function(piece) {
      piece.dataset.rotation = 0; // starting angle (in degrees)
      piece.style.position = "absolute"; // ensure absolute positioning
      piece.addEventListener("mousedown", startDrag);
      piece.addEventListener("dblclick", rotatePiece);
    });
  
    let selectedPiece = null;
    let offsetX = 0, offsetY = 0;
  
    // Start dragging: record the selected piece and calculate the offset
    function startDrag(e) {
      selectedPiece = this;
      // Bring the selected piece to the front
      selectedPiece.style.zIndex = 1000;
      
      // Calculate offset relative to the piece's top-left corner
      const rect = selectedPiece.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      
      // Attach listeners for moving and ending drag
      document.addEventListener("mousemove", dragPiece);
      document.addEventListener("mouseup", endDrag);
      
      e.preventDefault();
    }
  
    // While dragging, update the piece's position relative to the left container
    function dragPiece(e) {
      if (!selectedPiece) return;
      
      // Get the left puzzle container's position
      const container = document.querySelector("#leftPuzzle");
      const containerRect = container.getBoundingClientRect();
      
      // Calculate the new top and left positions
      const newLeft = e.clientX - containerRect.left - offsetX;
      const newTop = e.clientY - containerRect.top - offsetY;
      
      // Set the new positions in pixels
      selectedPiece.style.left = newLeft + "px";
      selectedPiece.style.top = newTop + "px";
    }
  
    // End dragging: remove move listeners, check drop location, and reset z-index
    function endDrag(e) {
      document.removeEventListener("mousemove", dragPiece);
      document.removeEventListener("mouseup", endDrag);
      
      if (!selectedPiece) return;
      
      // Get the bounding rectangle for the right puzzle container
      const rightPuzzle = document.querySelector("#rightPuzzle");
      const rightRect = rightPuzzle.getBoundingClientRect();
      const pieceRect = selectedPiece.getBoundingClientRect();
      
      // Compute the center of the piece
      const pieceCenterX = pieceRect.left + pieceRect.width / 2;
      const pieceCenterY = pieceRect.top + pieceRect.height / 2;
      
      // Check if the piece's center is inside the right container
      if (
        pieceCenterX >= rightRect.left &&
        pieceCenterX <= rightRect.right &&
        pieceCenterY >= rightRect.top &&
        pieceCenterY <= rightRect.bottom
      ) {
        // Snap the piece into the right container:
        // Calculate the piece's new position relative to the right container
        const relativeLeft = pieceCenterX - rightRect.left - pieceRect.width / 2;
        const relativeTop = pieceCenterY - rightRect.top - pieceRect.height / 2;
        
        // Set the piece's position to the snapped location
        selectedPiece.style.left = relativeLeft + "px";
        selectedPiece.style.top = relativeTop + "px";
        
        // Move the piece from the left container to the right container
        rightPuzzle.appendChild(selectedPiece);
      } else {
        // If not dropped in the right container, reset z-index
        selectedPiece.style.zIndex = 1;
      }
      
      selectedPiece = null;
    }
  
    // Rotate the piece by 15 degrees on double-click
    function rotatePiece(e) {
      let currentRotation = parseInt(this.dataset.rotation, 10) || 0;
      currentRotation = (currentRotation + 15) % 360;
      this.dataset.rotation = currentRotation;
      
      // Apply the rotation transformation
      this.style.transform = "rotate(" + currentRotation + "deg)";
    }
  });
  