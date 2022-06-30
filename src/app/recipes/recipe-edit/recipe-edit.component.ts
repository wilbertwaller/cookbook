import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEditMode: boolean = false;
  form: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.isEditMode = params['id'] != null;
        this.initForm();
      })
  }

  private initForm() {
    const recipe = this.isEditMode && this.recipeService.getRecipe(this.id);
    const name = recipe ? recipe.name : '';
    const imageSrc = recipe ? recipe.imageSrc : '';
    const description = recipe ? recipe.description : '';
    const ingredients = recipe ? recipe.ingredients.map(ingredient => new FormGroup({
      'name': new FormControl(ingredient.name, Validators.required),
      'amount': new FormControl(
        ingredient.amount,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]
      )
    })) : [];
    
    this.form = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imageSrc': new FormControl(imageSrc, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': new FormArray(ingredients),
    })
  }

  ingredients() {
    return (<FormArray>this.form.get('ingredients')).controls
  }

  onAddIngredient() {
    (<FormArray>this.form.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(
        null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]
      )
    }))
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index)
  }

  onSubmit() {
    if (this.isEditMode) this.recipeService.updateRecipe(this.id, this.form.value)
    else this.recipeService.addRecipe(this.form.value)
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
