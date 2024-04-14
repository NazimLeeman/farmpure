import { Component, Input, inject } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AssetService } from '@app/shared/services';
import { FarmAsset } from '@app/shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ng-dynamic-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
  private assetService = inject(AssetService);
  assetForm!: FormGroup;

	@Input() id!: number;
	@Input() asset: FarmAsset | undefined;

	today = new Date();
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    
  }

	ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Retrieve 'id' parameter from route params
      this.id = params['id'];
      if(this.id) {
        this.assetService.get(this.id).subscribe((asset) => {
          this.asset = asset;
          this.assetForm = this.fb.group({
            name: [this.asset.name, Validators.required],
            description: [this.asset.description]
          })
        });
      }
    });
		
	}
}
