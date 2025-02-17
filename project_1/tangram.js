// Global variables for dragging and selection
let selectedPiece = null;
let dragging = false;
let offsetX = 0;
let offsetY = 0;

window.addEventListener("load", function() {
  // Get all puzzle pieces inside the container
  const pieces = document.querySelectorAll(".puzzle-container > div");

  // Mapping from class names to piece names (with color info)
  const pieceNames = {
    "triangle-large-1": "Large Triangle 1 (Purple)",
    "triangle-large-2": "Large Triangle 2 (Blue)",
    "triangle-medium": "Medium Triangle (Violet)",
    "triangle-small-1": "Small Triangle 1 (Orangered)",
    "triangle-small-2": "Small Triangle 2 (Cadetblue)",
    "square": "Square (Darkgreen)",
    "parallelogram": "Parallelogram (Orange)"
  };

  // Get the dropdown element (assumed to be in the HTML)
  const dropdown = document.getElementById("angleDropdown");

  // Initialize each piece and create dropdown options
  pieces.forEach(function(piece, index) {
    piece.dataset.rotation = 0; // starting rotation (in degrees)
    piece.style.position = "absolute"; // ensure absolute positioning

    // Assign a unique id if not already set
    if (!piece.id) {
      piece.id = "piece-" + index;
    }

    // Determine piece name by checking its class list
    for (let key in pieceNames) {
      if (piece.classList.contains(key)) {
        piece.dataset.name = pieceNames[key];
        break;
      }
    }

    // Attach event listeners for dragging and selection
    piece.addEventListener("mousedown", function(e) {
      selectedPiece = this;
      dragging = true;
      // Remove existing selection indicator from all pieces
      pieces.forEach(p => p.classList.remove("selected"));
      // Add visual indicator for selected piece
      this.classList.add("selected");

      // Calculate offset between mouse and piece's top-left corner
      const rect = this.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      e.preventDefault();
    });

    // Optional: rotate the piece on double-click
    piece.addEventListener("dblclick", function(e) {
      rotatePiece(this, 15);
      e.stopPropagation();
    });
  });

  // Update position while dragging
  document.addEventListener("mousemove", function(e) {
    if (dragging && selectedPiece) {
      const container = document.querySelector(".puzzle-container");
      const containerRect = container.getBoundingClientRect();
      const newLeft = e.clientX - containerRect.left - offsetX;
      const newTop = e.clientY - containerRect.top - offsetY;
      selectedPiece.style.left = newLeft + "px";
      selectedPiece.style.top = newTop + "px";
    }
  });

  // Stop dragging on mouseup
  document.addEventListener("mouseup", function() {
    dragging = false;
  });

  // Rotate button functionality: rotate selected piece by 15°
  document.getElementById("rotateBtn").addEventListener("click", function() {
    if (selectedPiece) {
      rotatePiece(selectedPiece, 15);
    } else {
      alert("Please select a piece to rotate.");
    }
  });

  // Initial population of the dropdown list
  updateDropdown();

  // Function to update dropdown list with current rotation angles for each piece
  function updateDropdown() {
    if (!dropdown) return;
    // Clear existing options, then add a placeholder
    dropdown.innerHTML = '<option value="">-- Piece Rotations --</option>';
    pieces.forEach(piece => {
      const option = document.createElement("option");
      option.value = piece.id;
      option.textContent = (piece.dataset.name || "Piece") + ": " + (piece.dataset.rotation || 0) + "°";
      dropdown.appendChild(option);
    });
  }

  // Make updateDropdown globally accessible for later calls
  window.updateDropdown = updateDropdown;
});

// Helper function to rotate a piece and update the dropdown list
function rotatePiece(piece, angle) {
  let currentRotation = parseInt(piece.dataset.rotation, 10) || 0;
  currentRotation = (currentRotation + angle) % 360;
  piece.dataset.rotation = currentRotation;
  piece.style.transform = "rotate(" + currentRotation + "deg)";
  // Update the dropdown list immediately
  if (window.updateDropdown) {
    window.updateDropdown();
  }
}
