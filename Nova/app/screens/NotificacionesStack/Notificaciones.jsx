import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import Notificacion from "../../components/Notificacion";

export default function Notificaciones() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingVertical: 15,
        paddingHorizontal: 15,
      }}
    >
      <Notificacion mensaje="¡Hola Alberto Calzados! Tus ventas están en ascenso esta semana. ¿Quieres conocer más detalles sobre los productos más vendidos o el rendimiento por tienda? ¡Haz clic aquí para obtener un análisis completo y tomar decisiones informadas para impulsar tu negocio al siguiente nivel!" />
      <Notificacion mensaje="¡Hola Alberto Calzados! Nos emociona informarte que tus datos de ventas del mes de enero ya están disponibles en la plataforma. Este informe detallado ofrece una visión completa de tus ventas durante el mes pasado, incluyendo análisis de tendencias, comparaciones con meses anteriores y destacando los productos o servicios más exitosos. Te animamos a revisar este informe de cerca y aprovechar la información para tomar decisiones estratégicas que impulsen aún más el crecimiento de tu empresa. ¡Estamos aquí para ayudarte en cada paso del camino hacia el éxito!" />
      <Notificacion mensaje="¡Hola Alberto Calzados! Este es un recordatorio amistoso para revisar tus estadísticas de ventas del último mes. Nuestros últimos informes proporcionan una visión detallada de tus ventas recientes, destacando áreas de fortaleza y oportunidades de mejora. Al analizar estos datos de cerca, podrás identificar patrones, tendencias y áreas de enfoque para impulsar el crecimiento futuro de tu empresa. No subestimes el poder de la información. ¡Toma el tiempo para revisar tus estadísticas y tomar decisiones informadas que impulsen el éxito de tu negocio!" />
      <Notificacion mensaje="¡Atención! Se ha detectado un aumento en el tráfico de clientes en tu tienda. Aprovecha esta oportunidad para ofrecer promociones especiales o mejorar la experiencia del cliente." />
      <Notificacion mensaje="¡Atención Alberto Calzados! Nos gustaría felicitarte por tu destacado rendimiento de ventas este trimestre. Según nuestros últimos datos, has superado significativamente tus objetivos de ventas, demostrando un compromiso excepcional y habilidades comerciales sobresalientes. Este logro es un testimonio de tu arduo trabajo y dedicación. Sin embargo, no te relajes. Utiliza esta victoria como motivación para seguir persiguiendo la excelencia y explorar nuevas oportunidades para crecer aún más. ¡Estamos aquí para apoyarte en cada paso del camino hacia el éxito continuo de tu empresa! Interfaz Renovada: Hemos rediseñado completamente la interfaz de usuario para que sea más limpia, moderna y fácil de navegar. Ahora podrás acceder a tus datos de ventas y realizar análisis con mayor fluidez y claridad." />
      <Notificacion mensaje="¡Hola Alberto Calzados! Estamos encantados de presentarte las emocionantes novedades de la última actualización de nuestra aplicación. En esta versión, nos hemos enfocado en brindarte una experiencia aún más intuitiva y poderosa para ayudarte a impulsar el crecimiento de tu negocio." />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
