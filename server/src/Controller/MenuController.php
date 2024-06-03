<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class MenuController extends AbstractController
{
    #[Route('/menu/{id}', methods: ['GET'])]
    public function menu(int $id): JsonResponse
    {
        return $this->json(
            [
                'id' => 1,
            ]
        );
    }
}
