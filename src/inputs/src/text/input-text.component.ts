import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@qontu/component-store';
import * as fromConfig from '../base/store/index';
import {
  InlineEditorEvents,
  INLINE_EDITOR_CONFIG,
} from '@qontu/ngx-inline-editor';
import { InputTextConfig } from './input-text.config';
import { InputBaseComponent } from '../base/input-base.component';

const defaultConfig: InputTextConfig = {
  type: 'text',
  max: Infinity,
  min: 0,
};

@Component({
  selector: 'inline-editor-text',
  template: `
    <input
      #input
      type="text"
      id="inlineEditorText"
      class="inline-editor-input"
      [ngClass]="{ 'inline-editor-input-invalid': this.invalid$ | async }"
      [ngModel]="value$ | async"
      (ngModelChange)="changeValue($event)"
      [disabled]="isDisabled$ | async"
      (click)="onClick($event)"
      (blur)="onBlur($event)"
      (focus)="onFocus($event)"
      (keyup.escape)="onEscape($event)"
      (keyup.enter)="onEnter($event)"
      (keypress)="onKeyPress($event)"
      [name]="config.name"
      [id]="config.id"
      [placeholder]="config.placeholder"
      [maxlength]="config.max"
      [minlength]="config.min"
    />
  `,
  styleUrls: ['../base/input-base.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: Store,
      useFactory: fromConfig.createStore,
    },
  ],
})
export class InputTextComponent extends InputBaseComponent<InputTextConfig>
  implements OnInit {
  static type = 'text';
  config: Partial<InputTextConfig>;
  constructor(
    protected store$: Store<fromConfig.State>,
    ngControl: NgControl,
    protected events: InlineEditorEvents,
    // TODO(Toni): https://github.com/angular/angular/issues/23395

    @Inject(INLINE_EDITOR_CONFIG) config: any = {},
  ) {
    super(store$, ngControl, events, config);
    this.config = {
      ...defaultConfig,
      ...config,
    };
  }
}
