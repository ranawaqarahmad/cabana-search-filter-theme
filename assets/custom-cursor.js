if (!customElements.get('custom-cursor')) {
    class CustomCursor extends HTMLElement {
      constructor() {
        super();
        const cursor = this;
        const cursorMoving = this.querySelector('.moving-cursor');
        const outerBorder = this.querySelector('.outer-border');
    
        const handleMouseMove = (e) => {
          cursorMoving.style.left = e.clientX + 'px';
          cursorMoving.style.top = e.clientY + 'px';
          setTimeout(() => {
            outerBorder.style.left = e.clientX + 'px';
            outerBorder.style.top = e.clientY + 'px';
          }, 50);
        };
    
        const handleMouseDown = () => {
          cursor.classList.add('cursor-animate');
        };
    
        const handleMouseUp = () => {
          cursor.classList.remove('cursor-animate');
        };
    
        const handleMouseEnterBody = () => {
          cursorMoving.style.opacity = "1";
          outerBorder.style.opacity = "1";
        };
    
        const handleMouseLeaveBody = () => {
          cursorMoving.style.opacity = "0";
          outerBorder.style.opacity = "0";
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseenter', handleMouseEnterBody);
        document.addEventListener('mouseleave', handleMouseLeaveBody);
        document.addEventListener('mouseover', handleMouseEnterBody);
      }
    }
    
    customElements.define('custom-cursor', CustomCursor);
  }
  