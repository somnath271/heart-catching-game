import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

const basketWidth = 150;
const basketHeight = 25;
const speed = 0.2; // pixels per frame (very slow for smooth control)
const barThickness = 10;

const GameCanvas = forwardRef(
  (
    {
      socket,
      playerNumber,
      players,
      setPlayers,
      hearts,
      leftPressed,
      rightPressed,
      gameStarted,
    },
    ref
  ) => {
    const canvasRef = useRef(null);
    const keysRef = useRef({});
    const animationFrameRef = useRef(null);
    const moveFrameRef = useRef(null);

    useImperativeHandle(ref, () => canvasRef.current);

    // Resize canvas
    useEffect(() => {
      const resizeCanvas = () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
        }
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    // Keyboard controls
    useEffect(() => {
      const handleKeyDown = (e) => {
        keysRef.current[e.key] = true;
      };
      const handleKeyUp = (e) => {
        keysRef.current[e.key] = false;
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, []);

    // Draw catching bar
    const drawBasket = (ctx, x, y, color) => {
      // Shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(x - basketWidth / 2 + 3, y + 3, basketWidth, basketHeight);

      // Main bar body
      ctx.fillStyle = color;
      ctx.fillRect(x - basketWidth / 2, y, basketWidth, basketHeight);

      // Top catching bar
      const brightColor = color === "#ffb6c1" ? "#ff0055" : "#0066ff";
      ctx.fillStyle = brightColor;
      ctx.fillRect(
        x - basketWidth / 2,
        y - barThickness,
        basketWidth,
        barThickness
      );

      // White highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillRect(
        x - basketWidth / 2,
        y - barThickness,
        basketWidth,
        barThickness / 3
      );

      // Black borders
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      ctx.strokeRect(
        x - basketWidth / 2,
        y - barThickness,
        basketWidth,
        basketHeight + barThickness
      );

      // White outline on catching bar
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        x - basketWidth / 2,
        y - barThickness,
        basketWidth,
        barThickness
      );
    };

    // Draw heart shape
    const drawHeart = (ctx, x, y, size) => {
      ctx.save();
      ctx.fillStyle = "#ff1e56";
      ctx.beginPath();

      // Start at bottom point
      ctx.moveTo(x, y + size / 4);

      // Left side
      ctx.bezierCurveTo(
        x,
        y - size / 8,
        x - size / 2,
        y - size / 4,
        x - size / 2,
        y - size / 3
      );

      // Top-left curve
      ctx.bezierCurveTo(
        x - size / 2,
        y - size / 2,
        x - size / 4,
        y - size / 2,
        x,
        y - size / 6
      );

      // Top-right curve
      ctx.bezierCurveTo(
        x + size / 4,
        y - size / 2,
        x + size / 2,
        y - size / 2,
        x + size / 2,
        y - size / 3
      );

      // Right side
      ctx.bezierCurveTo(
        x + size / 2,
        y - size / 4,
        x,
        y - size / 8,
        x,
        y + size / 4
      );

      ctx.closePath();
      ctx.fill();

      // Glossy highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.beginPath();
      ctx.ellipse(
        x - size / 6,
        y - size / 4,
        size / 8,
        size / 6,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.restore();
    };

    // Game loop
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      const update = () => {
        // Fill background
        ctx.fillStyle = "rgba(255, 117, 140, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw catching bars
        const hasPlayers = Object.keys(players).length > 0;

        for (let p in players) {
          const color = p === "1" ? "#ffb6c1" : "#89cff0";
          const basketY = canvas.height - 100;
          drawBasket(ctx, players[p].x, basketY, color);

          // Update player Y position
          if (setPlayers) {
            setPlayers((prev) => ({
              ...prev,
              [p]: { ...prev[p], y: basketY - barThickness },
            }));
          }
        }

        // Draw test bar if no players yet
        if (!hasPlayers && playerNumber) {
          const testColor = playerNumber === 1 ? "#ffb6c1" : "#89cff0";
          drawBasket(ctx, canvas.width / 2, canvas.height - 100, testColor);
        }

        // Draw hearts
        hearts.forEach((h) => {
          drawHeart(ctx, h.x, h.y, h.size);
        });

        animationFrameRef.current = requestAnimationFrame(update);
      };

      update();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [players, hearts, playerNumber, setPlayers]);

    // Player movement
    useEffect(() => {
      if (!playerNumber || !players[playerNumber]) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const movePlayer = () => {
        const p = players[playerNumber];
        if (!p) return;

        let newX = p.x;

        if (
          keysRef.current["a"] ||
          keysRef.current["ArrowLeft"] ||
          leftPressed
        ) {
          newX -= speed;
        }
        if (
          keysRef.current["d"] ||
          keysRef.current["ArrowRight"] ||
          rightPressed
        ) {
          newX += speed;
        }

        newX = Math.max(
          basketWidth / 2,
          Math.min(canvas.width - basketWidth / 2, newX)
        );

        if (newX !== p.x) {
          const basketY = canvas.height - 100;
          socket.emit("move", {
            player: playerNumber,
            x: newX,
            y: basketY - barThickness,
            screenHeight: canvas.height,
          });

          setPlayers((prev) => ({
            ...prev,
            [playerNumber]: { ...prev[playerNumber], x: newX },
          }));
        }

        moveFrameRef.current = requestAnimationFrame(movePlayer);
      };

      movePlayer();

      return () => {
        if (moveFrameRef.current) {
          cancelAnimationFrame(moveFrameRef.current);
        }
      };
    }, [playerNumber, players, socket, leftPressed, rightPressed, setPlayers]);

    return (
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
    );
  }
);

export default GameCanvas;
