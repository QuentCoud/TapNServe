<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class CommandeController extends AbstractController
{

    #[Route('/commande/{id}', methods: ['GET'])]
    public function commande(int $id): JsonResponse
    {
        return $this->json(
            [
                'id' => 1,
            ]
        );
    }

    #[Route('/commande/{id}/status', methods: ['GET'])]
    public function status(int $id): JsonResponse
    {
        return $this->json(
            [
                'id' => $id,
                'status' => 'pending',
            ]
        );
    }

    #[Route('/commande', methods: ['POST'])]
    public function create(): JsonResponse
    {
        return new JsonResponse(['ok' => 'ok']);
    }

    #[Route('/commande/{id}', methods: ['PUT'])]
    public function update(int $id): JsonResponse
    {
        return $this->json(
            [
                'id' => $id,
            ]
        );
    }

    #[Route('/commande/{id}', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        return $this->json(["success" => true], 200);
    }
}
