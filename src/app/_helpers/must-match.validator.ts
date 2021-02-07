import { FormGroup } from '@angular/forms';

// validateur personnalisé pour vérifier que deux champs correspondent
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // retourne si un autre validateur a déjà trouvé une erreur sur le matchingControl
            return;
        }

        // définir une erreur sur matchingControl si la validation échoue
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
