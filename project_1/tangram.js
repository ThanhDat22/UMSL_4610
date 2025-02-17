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

  // Get the dropdown element
  const dropdown = document.getElementById("angleDropdown");

  // Initialize each piece: record its original position and set up events
  pieces.forEach(function(piece, index) {
    piece.dataset.rotation = 0; // starting rotation in degrees
    piece.style.position = "absolute"; // ensure absolute positioning

    // Assign a unique id if not set
    if (!piece.id) {
      piece.id = "piece-" + index;
    }

    // Determine piece name based on class
    for (let key in pieceNames) {
      if (piece.classList.contains(key)) {
        piece.dataset.name = pieceNames[key];
        break;
      }
    }

    // Record the original (destination) position from computed style
    const computedStyle = window.getComputedStyle(piece);
    piece.dataset.originalLeft = parseInt(computedStyle.left, 10) || 0;
    piece.dataset.originalTop = parseInt(computedStyle.top, 10) || 0;

    // Attach event listeners for dragging and selection
    piece.addEventListener("mousedown", function(e) {
      selectedPiece = this;
      dragging = true;
      // Remove selection indicator from all pieces and reset z-index
      pieces.forEach(p => {
        p.classList.remove("selected");
        p.style.zIndex = 1;
      });
      // Mark this piece as selected and bring it to the front
      this.classList.add("selected");
      this.style.zIndex = 1000;

      // Update dropdown to select this piece
      if (dropdown) {
        dropdown.value = this.id;
      }

      // Calculate offset between mouse and piece's top-left corner
      const rect = this.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      e.preventDefault();
    });

    // Optional: rotate on double-click
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

  // Rotate button: rotate selected piece by 15°
  document.getElementById("rotateBtn").addEventListener("click", function() {
    if (selectedPiece) {
      rotatePiece(selectedPiece, 15);
    } else {
      alert("Please select a piece to rotate.");
    }
  });

  // Fine-tune movement: arrow buttons move the selected piece 1px at a time.
  document.getElementById("moveLeftBtn").addEventListener("click", function() {
    if (selectedPiece) {
      let currentLeft = parseInt(selectedPiece.style.left, 10);
      if (isNaN(currentLeft)) {
        currentLeft = parseInt(window.getComputedStyle(selectedPiece).left, 10) || 0;
      }
      selectedPiece.style.left = (currentLeft - 1) + "px";
    } else {
      alert("Please select a piece to move.");
    }
  });

  document.getElementById("moveRightBtn").addEventListener("click", function() {
    if (selectedPiece) {
      let currentLeft = parseInt(selectedPiece.style.left, 10);
      if (isNaN(currentLeft)) {
        currentLeft = parseInt(window.getComputedStyle(selectedPiece).left, 10) || 0;
      }
      selectedPiece.style.left = (currentLeft + 1) + "px";
    } else {
      alert("Please select a piece to move.");
    }
  });

  document.getElementById("moveUpBtn").addEventListener("click", function() {
    if (selectedPiece) {
      let currentTop = parseInt(selectedPiece.style.top, 10);
      if (isNaN(currentTop)) {
        currentTop = parseInt(window.getComputedStyle(selectedPiece).top, 10) || 0;
      }
      selectedPiece.style.top = (currentTop - 1) + "px";
    } else {
      alert("Please select a piece to move.");
    }
  });

  document.getElementById("moveDownBtn").addEventListener("click", function() {
    if (selectedPiece) {
      let currentTop = parseInt(selectedPiece.style.top, 10);
      if (isNaN(currentTop)) {
        currentTop = parseInt(window.getComputedStyle(selectedPiece).top, 10) || 0;
      }
      selectedPiece.style.top = (currentTop + 1) + "px";
    } else {
      alert("Please select a piece to move.");
    }
  });

  // Animate button: animate selected piece from current to original position
  document.getElementById("animateBtn").addEventListener("click", function() {
    if (selectedPiece) {
      // Get original coordinates from dataset
      let destLeft = parseInt(selectedPiece.dataset.originalLeft, 10);
      let destTop = parseInt(selectedPiece.dataset.originalTop, 10);
      // Use jQuery animate to move piece smoothly over 1 second
      $(selectedPiece).animate({
        left: destLeft + "px",
        top: destTop + "px"
      }, 1000, function() {
        // Optionally update dropdown after animation
        updateDropdown();
      });
    } else {
      alert("Please select a piece to animate.");
    }
  });

  // Dropdown change event: when the user selects a piece from the list, mark it as selected.
  dropdown.addEventListener("change", function() {
    pieces.forEach(p => {
      p.classList.remove("selected");
      p.style.zIndex = 1;
    });
    if (this.value) {
      const piece = document.getElementById(this.value);
      if (piece) {
        selectedPiece = piece;
        piece.classList.add("selected");
        piece.style.zIndex = 1000;
      }
    }
  });

  // Initial population of the dropdown list
  updateDropdown();

  // Function to update dropdown list with current rotation angles for each piece
  function updateDropdown() {
    if (!dropdown) return;
    dropdown.innerHTML = '<option value="">-- Piece Rotations --</option>';
    pieces.forEach(piece => {
      const option = document.createElement("option");
      option.value = piece.id;
      option.textContent = (piece.dataset.name || "Piece") + ": " + (piece.dataset.rotation || 0) + "°";
      dropdown.appendChild(option);
    });
    if (selectedPiece) {
      dropdown.value = selectedPiece.id;
    }
  }

  // Make updateDropdown globally accessible for later calls
  window.updateDropdown = updateDropdown;
});

// Helper function to rotate a piece by a given angle increment and update dropdown
function rotatePiece(piece, angle) {
  let currentRotation = parseInt(piece.dataset.rotation, 10) || 0;
  currentRotation = (currentRotation + angle) % 360;
  piece.dataset.rotation = currentRotation;
  piece.style.transform = "rotate(" + currentRotation + "deg)";
  if (window.updateDropdown) {
    window.updateDropdown();
  }
}
