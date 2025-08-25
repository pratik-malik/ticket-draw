<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WelcomeNotification extends Notification
{
    use Queueable;

    public function __construct()
    {
        //
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('Welcome to Our Application!')
                    ->greeting('Hello ' . $notifiable->name . ',')
                    ->line('Thank you for registering with us!')
                    ->action('Get Started', url('/login?email=' . $notifiable->email))
                    ->line('We are excited to have you on board.')
                    ->line('For now your password has been set to "password", please change it after logging in.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
