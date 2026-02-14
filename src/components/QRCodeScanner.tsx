import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Button } from './ui/button';

const passphrase = 'I LOVE YOU';
const message = '💝 ⪽⊏ ☐ᐱ☐⟔ᑅ ⊔⟔☐⟇ ᐳ⊓ᒥᐯ ⟇ᒥ🝕ᐯ ⪾ᑅ ᐱ⪽ᐳ☐ ᐯ⟇☐☐ᐳ ⪽⟔ᒪ⊓ᒧ⟔⊐ ⊓ᒥ⊐☐ᐯ ᒥ🝕ᐯᒥ⊐☐ ᐳ⊓☐ 🝕⪽ᐳ☐ 💝';

export default function QRCodeScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!videoRef.current) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        const scannedText = result.data;
        setResult(scannedText);

        // Check if the scanned QR code contains the passphrase
        if (scannedText === passphrase) {
          setError('');
          // You can add success logic here (e.g., show a special message)
          console.log(`Success! QR code contains "${passphrase}"`);
        } else {
          setError(`Scanned: "${scannedText}" - This is not the right QR code. Please scan the one with the correct text.`);
        }
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    setScanner(qrScanner);

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  const startScanning = async () => {
    if (!scanner) return;

    try {
      await scanner.start();
      setIsScanning(true);
      setError('');
      setResult('');
    } catch (err) {
      setError('Failed to start camera. Please ensure camera permissions are granted.');
      console.error('Scanner error:', err);
    }
  };

  const stopScanning = () => {
    if (!scanner) return;
    scanner.stop();
    setIsScanning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Scan QR Code</h2>
      <p className="text-center text-muted-foreground">
        Scan a QR code that contains the text "{passphrase}" to reveal a special message! 💌
      </p>

      <div className="relative w-full max-w-md aspect-square bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
        />
        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <p className="text-white">Camera not active</p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {!isScanning ? (
          <Button onClick={startScanning} size="lg">
            Start Scanning
          </Button>
        ) : (
          <Button onClick={stopScanning} variant="destructive" size="lg">
            Stop Scanning
          </Button>
        )}
      </div>

      {result === passphrase && (
        <div
          className={`p-4 rounded-lg w-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100`}
        >
            <p className="font-bold">{message}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg w-full">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
