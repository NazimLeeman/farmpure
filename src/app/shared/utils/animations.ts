import {
  trigger,
  transition,
  style,
  query,
  stagger,
  animate,
  state
} from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
      query(':enter',
          [
              style({ opacity: 0, transform: 'translateY(-15px)' }),
              stagger('100ms',
                  animate('500ms ease-out',
                      style({ opacity: 1, transform: 'translateY(0px)' })
                  )
              )
          ],
          { optional: true }
      )
  ])
]);

export const cardAnimation = trigger('cardAnimator', [
  state(
      'out',
      style({ transform: 'scale(1)', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' })
  ),
  state(
      'hover',
      style({ transform: 'scale(1.025)', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.3)' })
  ),
  transition('out => hover', animate('200ms ease-in')),
  transition('hover => out', animate('200ms ease-out')),
]);
