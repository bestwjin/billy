import {AnimationController, Animation} from '@ionic/angular';

const DURATION = 200;
const L_DURATION = 500; 
const EASING = 'cubic-bezier(0.36,0.66,0.04,1)';

export const myAnimation = (baseEl: HTMLElement, opts?:any): Animation => {
    
    console.log('baseEl: ', baseEl);
    console.log('opts: ', opts);

    const page_name_enter = opts.enteringEl.localName;
    const page_name_leave = opts.leavingEl.localName;

    console.log("엔터링 페이지 : ", page_name_enter);
    console.log("리빙 페이지 : ", page_name_leave);

    const animationCtrl = new AnimationController();

    // root animation with common setup for the whole transition
    const rootTransition = animationCtrl.create()
        .duration(opts.duration || DURATION)
        .easing(EASING);

    // ensure that the entering page is visible from the start of the transition
    const enteringPage = animationCtrl.create()
        .addElement(getIonPageElement(opts.enteringEl))
        .beforeRemoveClass('ion-page-invisible');

    // create animation for the leaving page
    const leavingPage = animationCtrl.create().addElement(
        getIonPageElement(opts.leavingEl)
    );
    
    if (opts.direction === 'forward') {
      if(page_name_enter === "app-add-item") {
        enteringPage.fromTo('transform', 'translateY(100%)', 'translateY(0)');
      } else {
        enteringPage.fromTo('transform', 'translateX(100%)', 'translateX(0)');
      }
      leavingPage.fromTo('opacity', '1', '0').duration(L_DURATION);
    } else {
      if(page_name_leave === "app-add-item") {
        leavingPage.fromTo('transform', 'translateY(0)', 'translateY(100%)')
            
      } else {
        leavingPage.fromTo('transform', 'translateX(0)', 'translateX(100%)');
      } 
      enteringPage.fromTo('opacity', '0', '1').duration(L_DURATION);
    }

    // include animations for both pages into the root animation
    rootTransition.addAnimation(enteringPage);
    rootTransition.addAnimation(leavingPage);
    return rootTransition; 
}

export const getIonPageElement = (element: HTMLElement) => {
  if (element.classList.contains('ion-page')) {
    return element;
  }

  const ionPage = element.querySelector(
    ':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs'
  );
  if (ionPage) {
    return ionPage;
  }
  // idk, return the original element so at least something animates
  // and we don't have a null pointer
  return element;
};
