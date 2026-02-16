"use client";

import {
    Column,
    Heading,
    Text,
    Row,
    Tag,
    Icon,
    SmartLink,
    RevealFx,
    Schema,
    Meta,
} from "@once-ui-system/core";
import { baseURL, certificates, person } from "@/resources";
import { Award, ExternalLink, Calendar, Building2 } from "lucide-react";
import styles from "./certificates.module.scss";
import { useLocale } from "@/i18n/client";

interface CertificateCardProps {
    name: string;
    issuer: string;
    date: string;
    link?: string;
    skills?: string[];
    index: number;
    viewCertificateLabel: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
    name,
    issuer,
    date,
    link,
    skills,
    index,
    viewCertificateLabel,
}) => {
    return (
        <RevealFx translateY="8" delay={0.1 * index} fillWidth style={{ height: "100%" }}>
            <div className={styles.certificateCard}>
                <Column gap="16" fillWidth style={{ height: "100%" }}>
                    {/* Header with icon */}
                    <Row gap="12" vertical="start">
                        <div className={styles.iconWrapper}>
                            <Award size={24} />
                        </div>
                        <Column gap="4" flex={1}>
                            <Heading as="h3" variant="heading-strong-m">
                                {name}
                            </Heading>
                            <Row gap="8" vertical="center">
                                <Building2 size={14} className={styles.metaIcon} />
                                <Text variant="body-default-s" onBackground="neutral-weak">
                                    {issuer}
                                </Text>
                            </Row>
                        </Column>
                    </Row>

                    {/* Date */}
                    <Row gap="8" vertical="center">
                        <Calendar size={14} className={styles.metaIcon} />
                        <Text variant="label-default-s" onBackground="neutral-weak">
                            {date}
                        </Text>
                    </Row>

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <Row gap="8" wrap>
                            {skills.map((skill) => (
                                <Tag key={skill} size="s" className={styles.skillTag}>
                                    {skill}
                                </Tag>
                            ))}
                        </Row>
                    )}

                    {/* View Certificate Link */}
                    {link && (
                        <Row style={{ marginTop: "auto" }}>
                            <SmartLink
                                href={link}
                                className={styles.viewLink}
                                suffixIcon="arrowUpRightFromSquare"
                            >
                                <Row gap="8" vertical="center">
                                    <ExternalLink size={14} />
                                    <Text variant="label-default-s">{viewCertificateLabel}</Text>
                                </Row>
                            </SmartLink>
                        </Row>
                    )}
                </Column>
            </div>
        </RevealFx>
    );
};

export default function CertificatesPage() {
    const { t } = useLocale();

    // Group certificates by issuer
    const groupedCertificates = certificates.items.reduce(
        (acc, cert) => {
            const issuer = cert.issuer;
            if (!acc[issuer]) {
                acc[issuer] = [];
            }
            acc[issuer].push(cert);
            return acc;
        },
        {} as Record<string, typeof certificates.items>
    );

    const issuerOrder = [
        "Dicoding Indonesia",
        "Dev.id",
        "Microsoft / Certiport",
        "CLIent(Centre of Language Improvement)",
    ];

    const sortedIssuers = Object.keys(groupedCertificates).sort((a, b) => {
        const aIndex = issuerOrder.indexOf(a);
        const bIndex = issuerOrder.indexOf(b);
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
    });

    let globalIndex = 0;

    return (
        <Column maxWidth="m" gap="xl" paddingY="xl" horizontal="center">
            <Schema
                as="webPage"
                baseURL={baseURL}
                path={certificates.path}
                title={certificates.title}
                description={certificates.description}
                image={`/api/og/generate?title=${encodeURIComponent(certificates.title)}`}
                author={{
                    name: person.name,
                    url: `${baseURL}/about`,
                    image: `${baseURL}${person.avatar}`,
                }}
            />

            {/* Page Header */}
            <Column fillWidth horizontal="center" gap="m" marginBottom="xl">
                <RevealFx translateY="4">
                    <Row gap="12" vertical="center">
                        <Award size={32} className={styles.headerIcon} />
                        <Heading variant="display-strong-l">{t.certificates.title}</Heading>
                    </Row>
                </RevealFx>
                <RevealFx translateY="8" delay={0.1}>
                    <Text
                        variant="body-default-l"
                        onBackground="neutral-weak"
                        wrap="balance"
                        align="center"
                    >
                        {t.certificates.subtitle}
                    </Text>
                </RevealFx>

                {/* Stats */}
                <RevealFx translateY="8" delay={0.2}>
                    <Row gap="24" marginTop="m">
                        <Column horizontal="center">
                            <Text variant="display-strong-m" onBackground="brand-strong">
                                {certificates.items.length}
                            </Text>
                            <Text variant="label-default-s" onBackground="neutral-weak">
                                {t.certificates.certificatesLabel}
                            </Text>
                        </Column>
                        <Column horizontal="center">
                            <Text variant="display-strong-m" onBackground="brand-strong">
                                {Object.keys(groupedCertificates).length}
                            </Text>
                            <Text variant="label-default-s" onBackground="neutral-weak">
                                {t.certificates.issuersLabel}
                            </Text>
                        </Column>
                    </Row>
                </RevealFx>
            </Column>

            {/* Certificates by Issuer */}
            {sortedIssuers.map((issuer) => (
                <Column key={issuer} fillWidth gap="m" marginBottom="l">
                    <RevealFx translateY="4" delay={0.05 * globalIndex}>
                        <Row gap="8" vertical="center" marginBottom="s">
                            <Building2 size={20} className={styles.issuerIcon} />
                            <Heading as="h2" variant="heading-strong-l">
                                {issuer}
                            </Heading>
                            <Tag size="s" className={styles.countTag}>
                                {groupedCertificates[issuer].length}
                            </Tag>
                        </Row>
                    </RevealFx>

                    <div className={styles.certificatesGrid}>
                        {groupedCertificates[issuer].map((cert) => {
                            const idx = globalIndex++;
                            return (
                                <CertificateCard
                                    key={cert.name}
                                    name={cert.name}
                                    issuer={cert.issuer}
                                    date={cert.date}
                                    link={cert.link}
                                    skills={cert.skills}
                                    index={idx}
                                    viewCertificateLabel={t.certificates.viewCertificate}
                                />
                            );
                        })}
                    </div>
                </Column>
            ))}
        </Column>
    );
}
