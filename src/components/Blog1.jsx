import { useEffect } from "react";


function debounce(func, wait = 20, immediate = true) {
    let timeout;
  
    return function () {
      const context = this;
      const args = arguments;
  
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
function Blog1() {

    useEffect(() => {
        const sliderImages = document.querySelectorAll('.slide-in');
    
        const checkSlide = (e) => {
          console.count(e);
    
          sliderImages.forEach((sliderImage) => {
            const slideInAt =
              window.scrollY + window.innerHeight - sliderImage.clientHeight / 2;
    
            const imageBottom = sliderImage.offsetTop + sliderImage.clientHeight;
            const isHalfShown = slideInAt > sliderImage.offsetTop;
            const isNotScrolledPast = window.scrollY < imageBottom;
    
            if (isHalfShown && isNotScrolledPast) {
              sliderImage.classList.add('active');
            } else {
              sliderImage.classList.remove('active');
            }
          });
        };
    
        const debouncedCheckSlide = debounce(checkSlide);
    
        window.addEventListener('scroll', debouncedCheckSlide);
    
        return () => {
          window.removeEventListener('scroll', debouncedCheckSlide);
        };
      }, []);

    return (
        <div>
            
  <div class="site-wrap">

<h1>Slide in on Scroll</h1>

<p>.</p>
<p>.</p>
<p></p>
<p></p>
<p></p>
<img src="http://unsplash.it/400/400" alt="" />
<img src="http://unsplash.it/400/400" class="align-left slide-in" />
<p></p>
<img src="http://unsplash.it/400/401" class="align-left slide-in" />
<p></p>
<img src="http://unsplash.it/200/500" class="align-left slide-in" />
<p></p>
<p></p>
<img src="http://unsplash.it/400/400" class="align-left slide-in"  />
<p></p>
<p></p>




</div>

        </div>
    )
}

export default Blog1