function scrollReel(offsetAmount) {
      document.getElementById('videoReel').scrollBy({
        top: offsetAmount,
        behavior: 'smooth'
      });
    }