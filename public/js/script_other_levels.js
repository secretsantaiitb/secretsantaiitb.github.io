---
---

(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener('click', function(e) {
    var target = e.target;
    console.log(target)
    if(target.id=="fire"){

      let visi=document.getElementsByClassName("clicky")
      Array.from(visi).forEach(element => 
        element.style.opacity=1
      );
      return;
    }

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);
})(document);