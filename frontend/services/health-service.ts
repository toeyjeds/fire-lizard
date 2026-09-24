interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface HealthStatus {
  status: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function getGatewayHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${apiUrl}/health`);
    if (!response.ok) {
      return false;
    }
    const payload: ApiResponse<HealthStatus> = await response.json();
    return payload.success && payload.data.status === "UP";
  } catch {
    return false;
  }
}