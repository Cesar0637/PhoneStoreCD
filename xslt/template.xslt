<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
	<xsl:output method="html" indent="yes"/>

	<xsl:param name="TipoMenu" select="TipoMenu">
	</xsl:param>

	<xsl:template match="Menu">
		<html lang="en">
			<head>
				<title>Ministore</title>
				<meta charset="utf-8"/>
				<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<meta name="format-detection" content="telephone=no"/>
				<meta name="apple-mobile-web-app-capable" content="yes"/>
				<meta name="author" content=""/>
				<meta name="keywords" content=""/>
				<meta name="description" content=""/>
				<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
				<link rel="stylesheet" type="text/css" href="style.css"/>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
				<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&amp;family=Lato:wght@300;400;700&amp;display=swap" rel="stylesheet"/>

				<!-- script
    ================================================== -->
				<script src="assets/js/modernizr.js"></script>
			</head>
			
			
		</html>
	</xsl:template>
</xsl:stylesheet>
