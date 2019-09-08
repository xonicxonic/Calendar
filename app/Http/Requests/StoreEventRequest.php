<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'days' => 'required',
            'event' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'days.required' => 'You must pick days.',
            'event.required'  => 'An Event is required.',
        ];
    }
}
