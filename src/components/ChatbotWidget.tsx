import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, X, Minimize2, Maximize2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { chatbotService, ChatMessage, ChatbotConfig } from "@/services/chatbotService";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

interface ChatbotWidgetProps {
  config?: ChatbotConfig;
}

const ChatbotWidget = ({ config }: ChatbotWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Détecter automatiquement le rôle basé sur la route
  const isInstructor = location.pathname.startsWith("/interface-instructeur") || 
                       location.pathname.startsWith("/tableau-de-bord-instructeur") ||
                       location.pathname.startsWith("/inscription-instructeur");
  
  // Utiliser la config fournie ou détecter automatiquement
  const chatbotConfig: ChatbotConfig = config || { 
    role: isInstructor ? "instructor" : "student" 
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Réinitialiser l'historique quand on ferme le chatbot
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInputValue("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Message de bienvenue initial adapté au rôle
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content: chatbotConfig.role === "student"
          ? "Bonjour ! 👋 Je suis JangalmaBot. Comment puis-je t'aider aujourd'hui ?"
          : "Bonjour ! 👋 Je suis votre assistant IA pour instructeurs sur Jangalma Code. Je peux vous aider à :\n\n📚 Créer et structurer des cours efficaces\n👥 Gérer vos étudiants et suivre leur progression\n📊 Analyser les performances et améliorer votre contenu\n💡 Optimiser vos cours pour de meilleurs résultats\n\nComment puis-je vous assister aujourd'hui ?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, chatbotConfig.role, messages.length]);

  const clearHistory = () => {
    setMessages([]);
    toast.success("Historique effacé");
    // Réafficher le message de bienvenue
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      role: "assistant",
      content: chatbotConfig.role === "student"
        ? "Bonjour ! 👋 Je suis JangalmaBot. Comment puis-je t'aider aujourd'hui ?"
        : "Bonjour ! Je suis votre assistant IA pour instructeurs. Comment puis-je vous assister ?",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    // Ajouter le message de l'utilisateur immédiatement
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Obtenir la réponse du chatbot
      const response = await chatbotService.sendMessage(
        userMessage.content,
        messages,
        chatbotConfig
      );

      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      
      // Ajouter un message d'erreur
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Désolé, une erreur est survenue. Veuillez réessayer plus tard.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const chatbotName = chatbotConfig.role === "student" ? "JangalmaBot" : "InstructorBot";

  return (
    <>
      {/* Bouton flottant pour ouvrir le chatbot */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
          aria-label="Ouvrir le chatbot"
        >
          <Bot className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Widget Chatbot */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
            isMinimized ? "w-80" : "w-[400px]"
          }`}
        >
          <div className="bg-background border-2 border-primary/20 rounded-lg shadow-2xl flex flex-col overflow-hidden h-[600px]">
            {/* Header */}
            <div className="bg-gradient-primary px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{chatbotName}</h3>
                  <Badge variant="secondary" className="text-xs mt-0.5 bg-white/20 text-white border-0">
                    Connecté
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isMinimized && messages.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearHistory}
                    className="h-8 w-8 text-white hover:bg-white/20"
                    title="Effacer l'historique"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Zone de messages */}
                <ScrollArea className="flex-1 bg-muted/30 p-4" style={{ height: 'calc(600px - 140px)' }}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8 border-2 border-primary/20">
                            <AvatarFallback className="bg-primary text-white">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[75%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-background border border-border"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.role === "user"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                        {message.role === "user" && (
                          <Avatar className="h-8 w-8 border-2 border-primary/20">
                            <AvatarFallback className="bg-secondary text-white">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <Avatar className="h-8 w-8 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-background border border-border rounded-lg p-3">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Zone de saisie */}
                <div className="border-t bg-background p-4">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      placeholder="Tapez votre message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="bg-gradient-primary"
                      size="icon"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;

