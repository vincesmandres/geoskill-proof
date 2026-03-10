"use client"

import { Header } from "@/components/header"
import Image from "next/image"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function AboutPage() {
  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
      desc: "Sígueme para actualizaciones",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin,
      desc: "Conéctate profesionalmente",
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: Github,
      desc: "Explora mis proyectos",
    },
    {
      name: "Email",
      href: "mailto:contact@example.com",
      icon: Mail,
      desc: "Envíame un mensaje",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Profile Section */}
        <div className="text-center mb-16">
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/profile.jpeg"
              alt="Profile"
              width={200}
              height={200}
              className="w-48 h-48 object-cover"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Acerca de GeoSkill Proof
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            GeoSkill Proof es una plataforma innovadora dedicada a la verificación académica de ensayos de geotecnia mediante tecnología blockchain. Nuestro objetivo es garantizar la integridad, autenticidad y trazabilidad de las prácticas de laboratorio en ingeniería civil.
          </p>

          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Creemos que la educación en ingeniería debe ser transparente y verificable. A través de la certificación en blockchain, los estudiantes pueden demostrar con confianza sus competencias técnicas de manera segura e inmutable.
          </p>
        </div>

        {/* Social Links */}
        <div className="border border-border border-t">
          <h2 className="text-2xl font-bold tracking-tight mb-8 pt-8 text-foreground">
            Síguenos
          </h2>

          <div className="grid md:grid-cols-2 gap-4 pb-8">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-border hover:bg-muted transition-colors"
                >
                  <Icon className="w-6 h-6 text-accent flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{link.name}</p>
                    <p className="text-sm text-muted-foreground">{link.desc}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © 2024 GeoSkill Proof. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Certificación académica respaldada por blockchain
          </p>
        </div>
      </main>
    </div>
  )
}
