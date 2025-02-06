<script lang="ts">
    export let data: {
        title: string;
        description: string;
        openGraph: {
            title: string;
            description: string;
            image: string;
            url: string;
            type: string;
        };
    };

    let url = '';
    let shortUrl = '';
    let loading = false;
    let errorMessage = '';

    async function shortenUrl() {
        if (!url.trim()) {
            errorMessage = 'Please enter a valid URL!';
            return;
        }

        loading = true;
        errorMessage = '';
        shortUrl = '';

        try {
            const res = await fetch('/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            const responseData = await res.json();
            if (responseData.shortUrl) {
                shortUrl = `${window.location.origin}${responseData.shortUrl}`;
            } else {
                errorMessage = 'Failed to shorten URL. Please try again!';
            }
        } catch (error) {
            errorMessage = 'Something went wrong. Please try again later!';
        } finally {
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>{data.title}</title>
    <meta name="description" content={data.description} />

    <meta property="og:title" content={data.openGraph.title} />
    <meta property="og:description" content={data.openGraph.description} />
    <meta property="og:image" content={data.openGraph.image} />
    <meta property="og:url" content={data.openGraph.url} />
    <meta property="og:type" content={data.openGraph.type} />
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 class="text-2xl font-semibold text-gray-800 text-center">🔗 URL Shortener</h1>
        <p class="text-sm text-gray-500 text-center mb-4">Enter a URL and get a shorter version!</p>

        <input bind:value={url} type="text" placeholder="Enter your URL..."
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none"
            on:input={() => (errorMessage = '')} />

        {#if errorMessage}
            <p class="text-red-500 text-sm mt-2">{errorMessage}</p>
        {/if}

        <button on:click={shortenUrl} 
            class="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg mt-3 
                   hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}>
            {#if loading}
                <span class="loading loading-spinner"></span>
            {:else}
                Shorten URL
            {/if}
        </button>

        {#if shortUrl}
            <div class="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <p class="text-gray-700">Shortened URL:</p>
                <a href={shortUrl} class="text-blue-600 font-medium underline break-words" target="_blank" rel="noopener noreferrer">
                    {shortUrl}
                </a>
            </div>
        {/if}
    </div>
</div>
