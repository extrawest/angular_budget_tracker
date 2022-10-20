import {ComponentType} from "@angular/cdk/overlay";

export interface StepConfig<T = any> {
  title: string;
  subtitle: string;
  component: ComponentType<T>;
}
