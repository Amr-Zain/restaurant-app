import { cookies } from 'next/headers';

export async function customFetch(endpoint: string, options: RequestInit = {}, params?:Record<string,string>): Promise<{ url: string; fetchOptions: RequestInit }> {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';
  let url = `${baseURL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    "os": "web",
  };

  const headers = new Headers({
    ...defaultHeaders,
    ...(options.headers as Record<string, string>),
  });

  const urlParams = new URLSearchParams();
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      urlParams.append(key, params[key]);
    }
  }
  try {
    const serverCookies = await cookies();

    const token = serverCookies.get('token')?.value;
    const locale = serverCookies.get("NEXT_LOCALE")?.value || "en";
    const storeCookie = serverCookies.get("store")?.value;
    const userCookie = serverCookies.get('user')?.value;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      const guestToken = serverCookies.get('guest_token')?.value;
      if (guestToken) {
        urlParams.append("guest_token", guestToken);
      }
    }

    if (storeCookie) {
      try {
        const store = JSON.parse(storeCookie);
        if (store && store.id) {
          urlParams.append("store_id", store.id);
        }
      } catch (parseError) {
        console.warn("Failed to parse 'store' cookie:", parseError);
      }
    }

    if (userCookie) {
      try {
        const user: { default_address?: { id?: string } } = JSON.parse(userCookie);
        if (user && user.default_address && user.default_address.id) {
          urlParams.append("address_id", user.default_address.id);
        }
      } catch (parseError) {
        console.warn("Failed to parse 'user' cookie:", parseError);
      }
    }

    headers.set("Accept-Language", locale);

  } catch (error) {
    console.error("Error preparing fetch request (from interceptor logic):", error);
    throw error;
  }

  const queryString = urlParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers: headers,
  };

  return { url, fetchOptions };
}
/* 
async function getProduct(slug: string): Promise<any> {
  try {
    const { url, fetchOptions } = await customFetch(`product/${slug}`, {
      method: 'GET',
    });

    const response = await fetch(url, fetchOptions);

    if (response.status === 401) {
      console.warn("Received 401 Unauthorized response. Consider clearing authentication tokens.");
      throw new Error('Unauthorized: Authentication failed.');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched product data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

async function createItem(itemData: object): Promise<any> {
  try {
    const { url, fetchOptions } = await customFetch('items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });

    const response = await fetch(url, fetchOptions);

    if (response.status === 401) {
      console.warn("Received 401 Unauthorized response. Consider clearing authentication tokens.");
      throw new Error('Unauthorized: Authentication failed.');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Created item:', result);
    return result;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
}
 */