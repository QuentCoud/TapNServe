<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/user/auth', methods: ['GET'])]
    public function auth() {
        return new JsonResponse(["token" => "Da1I3d5UBA3872yFde28ea23F"]);
    }
}