<?php

namespace App\Http\Requests\AcademicYear;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAcademicYearRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'year' => [
                'required',
                'max:255',
                Rule::unique('years')->ignore($this->route('year')),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'year.required' => 'حقل السنة الدراسية مطلوب',
            'year.unique' => 'السنة الدراسية موجودة بالفعل',
            'year.max' => 'يجب ألا يتجاوز طول السنة الدراسية 255 حرفًا',
        ];
    }

    
}
