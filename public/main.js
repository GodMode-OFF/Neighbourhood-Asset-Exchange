// main.js

document.addEventListener("DOMContentLoaded", () => {
    // Make sure buttons are not blocked by JavaScript issues
    const borrowButtons = document.querySelectorAll('.borrow-button');
    borrowButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const itemId = e.target.getAttribute('data-id');
        window.location.href = `/borrow-item/${itemId}`;
      });
    });
  
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const itemId = e.target.getAttribute('data-id');
        const form = document.querySelector(`#delete-form-${itemId}`);
        form.submit();
      });
    });
  });
  