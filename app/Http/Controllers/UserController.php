<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\WelcomeNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }

    public function createAgent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors()->first());
        }
        $user = User::create(array_merge($validator->validated(), ['password' => Hash::make('password'), 'reference_token' => User::generateReferenceToken()]));

        $user->notify(new WelcomeNotification());

        return redirect()->route('users.index')->with('success', 'Agent created successfully.');
    }

    public function createClient(Request $request)
    {
        dd("In client create");
    }
}
