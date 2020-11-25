const Star = {
  $container: null,
  starCount: 5,
  prevStar: 0,
  init: function() {
    this.$container = document.body.getElementsByClassName('container')[0];
    let starHTML = '';
    for (let i = 0; i < this.starCount; i += 1) starHTML += this.getStarHTMLStr(i);
    this.$container.innerHTML = starHTML;
    this.$container.onclick = this.makeSelection.bind(this);
    this.$container.addEventListener('mouseover', this.addHover.bind(this));
    this.$container.addEventListener('mouseout', this.removeHover.bind(this));
  },
  getStarHTMLStr: function(index) {
    const $div = document.createElement('div');
    $div.className = "star";
    $div.setAttribute('data-index', index);
    return $div.outerHTML;
  },
  getTargetIndex: function (ev){
    const indexStr = ev.target.getAttribute('data-index');
    if (!indexStr) return -1;
    return Number(indexStr);
  },
  makeSelection: function(ev) {
    const targetIndex = this.getTargetIndex(ev);
    if (targetIndex < 0) return;
    if (this.prevStar <= targetIndex) this.addStar(this.prevStar, targetIndex);
    else this.removeStar(targetIndex+1, this.prevStar);
    this.prevStar = targetIndex;
  },
  addHover: function(ev) {
    const targetIndex = this.getTargetIndex(ev);
    if (targetIndex < 0) return;
    for (let i = 0; i <= targetIndex; i += 1) {
      this.$container.children[i].classList.add('hover');
    }
  },
  removeHover: function(ev) {
    Array.from(this.$container.getElementsByClassName('hover')).forEach(el => el.classList.remove('hover'));
  },
  addStar: function(start, end) {
    for (let i = start; i <= end; i += 1) this.$container.children[i].classList.add('sel');
  },
  removeStar: function(start, end, classNameToChange) {
    for (let i = start; i <= end; i += 1) this.$container.children[i].classList.remove('sel');
  }
}