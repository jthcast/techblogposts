export async function gtagOutboundEvent(link: string, title: string) {
  await fetch('/api/view-count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      link,
    }),
  });
  gtag('event', 'click', {
    event_category: 'outbound',
    event_label: title,
    transport_type: 'beacon',
  });
}
