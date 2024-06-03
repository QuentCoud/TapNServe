<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class MenuItemController extends AbstractController
{
    #[Route('/menu/item', methods: ['POST'])]
    public function create(): JsonResponse
    {
        return $this->json(
            [
                'id' => 1,
            ]
        );
    }

    #[Route('/menu/item/{id}', methods: ['PUT'])]
    public function update(int $id): JsonResponse
    {
        return $this->json(
            [
                'id' => $id,
            ]
        );
    }

    #[Route('/menu/item/{id}', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        return $this->json(["success" => true], 200);
    }
}
